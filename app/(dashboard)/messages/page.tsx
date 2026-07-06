'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Clock, User, QrCode, Mail, Loader, Check } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageThread {
  messageId: string;
  itemId: string;
  ownerId: string;
  scanId: string;
  createdAt: Date;
  status: string;
  finderInfo: {
    name: string;
    email?: string;
  };
  thread: Array<{
    role: 'finder' | 'owner';
    text: string;
    sentAt: any;
  }>;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setThreads([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const q = query(
      collection(db, 'messages'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedThreads: MessageThread[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
          fetchedThreads.push({
            messageId: document.id,
            itemId: data.itemId,
            ownerId: data.ownerId,
            scanId: data.scanId,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            status: data.status || 'unread',
            finderInfo: data.finderInfo || { name: 'Anonymous Finder' },
            thread: data.thread || [],
          });
        });
        // Sort in memory to avoid requiring a composite index
        fetchedThreads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setThreads(fetchedThreads);
        setIsLoading(false);

        // Keep current selected thread updated with new messages
        if (selectedThread) {
          const updated = fetchedThreads.find((t) => t.messageId === selectedThread.messageId);
          if (updated) {
            setSelectedThread(updated);
          }
        } else if (fetchedThreads.length > 0) {
          setSelectedThread(fetchedThreads[0]);
        }
      },
      (err) => {
        console.error('Error fetching messages:', err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, selectedThread?.messageId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedThread?.thread]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedThread) return;

    setIsSending(true);
    try {
      const docRef = doc(db, 'messages', selectedThread.messageId);
      const newMsg = {
        role: 'owner',
        text: replyText.trim(),
        sentAt: new Date(),
      };

      await updateDoc(docRef, {
        thread: arrayUnion(newMsg),
        status: 'read',
      });

      setReplyText('');
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Could not send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const getLatestMessage = (thread: Array<{ text: string; role: string }>) => {
    if (thread.length === 0) return '';
    const last = thread[thread.length - 1];
    return last.role === 'owner' ? `You: ${last.text}` : last.text;
  };

  const formatMessageTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Finder Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Chat securely with finders who scan or locate your Vouch-protected items
        </p>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-3 gap-6 h-[500px]">
          <div className="lg:col-span-1 space-y-3 bg-surface-elevated/40 border border-border/50 rounded-2xl p-4 animate-pulse" />
          <div className="lg:col-span-2 bg-surface-elevated border border-border/50 rounded-2xl p-4 animate-pulse" />
        </div>
      ) : threads.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6 h-[500px] border border-border/50 rounded-2xl bg-surface-elevated overflow-hidden">
          {/* Thread List */}
          <div className="lg:col-span-1 border-r border-border/40 overflow-y-auto flex flex-col h-full">
            <div className="p-4 border-b border-border/30 bg-surface/30">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversations</h2>
            </div>
            <div className="flex-1 divide-y divide-border/30">
              {threads.map((thread) => {
                const isSelected = selectedThread?.messageId === thread.messageId;
                const isUnread = thread.status === 'unread';
                return (
                  <button
                    key={thread.messageId}
                    onClick={() => setSelectedThread(thread)}
                    className={`w-full text-left p-4 transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-primary/5 text-foreground'
                        : 'hover:bg-surface-overlay text-muted-foreground'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className={`text-sm font-semibold truncate ${isSelected || isUnread ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {thread.finderInfo.name}
                        </p>
                        {isUnread && (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs truncate mb-1">{getLatestMessage(thread.thread)}</p>
                      <span className="text-[10px] text-muted-foreground/60 font-mono">
                        {thread.itemId}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 flex flex-col h-full bg-surface/10">
            {selectedThread ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border/30 bg-surface/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{selectedThread.finderInfo.name}</p>
                      {selectedThread.finderInfo.email && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {selectedThread.finderInfo.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-muted/40 text-muted-foreground font-semibold font-mono">
                      {selectedThread.itemId}
                    </span>
                  </div>
                </div>

                {/* Messages Body */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedThread.thread.map((msg, i) => {
                    const isOwner = msg.role === 'owner';
                    return (
                      <div
                        key={i}
                        className={`flex ${isOwner ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            isOwner
                              ? 'bg-primary text-on-primary rounded-tr-none'
                              : 'bg-surface border border-border/50 text-foreground rounded-tl-none'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className={`text-[9px] block text-right mt-1 font-mono ${
                            isOwner ? 'text-on-primary/60' : 'text-muted-foreground/60'
                          }`}>
                            {formatMessageTime(msg.sentAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat Footer Reply Form */}
                <div className="p-4 border-t border-border/30 bg-surface/30">
                  <form onSubmit={handleSendReply} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      disabled={isSending}
                      className="flex-1 px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isSending || !replyText.trim()}
                      className="p-3 bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                    >
                      {isSending ? (
                        <Loader className="w-4.5 h-4.5 animate-spin" />
                      ) : (
                        <Send className="w-4.5 h-4.5" />
                      )}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <MessageSquare className="w-10 h-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">Select a conversation to read message history</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/40 rounded-3xl p-6 bg-surface-elevated/30">
          <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center mb-4">
            <MessageSquare className="w-7 h-7 text-muted-foreground/50" />
          </div>
          <h2 className="text-lg font-bold mb-1">No Messages Yet</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Finder message logs are empty. When a finder sends a message regarding a scanned item, it will show up here.
          </p>
        </div>
      )}
    </div>
  );
}
