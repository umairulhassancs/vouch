const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const Fi = require('react-icons/fi');
const Md = require('react-icons/md');
const Fa = require('react-icons/fa6');
const Gi = require('react-icons/gi');
const Bs = require('react-icons/bs');
const Pi = require('react-icons/pi');

const icons = [
  ['search', Fi.FiSearch],
  ['users', Fi.FiUsers],
  ['alert', Fi.FiAlertTriangle],
  ['target', Fi.FiTarget],
  ['key', Md.MdOutlineVpnKey],
  ['wallet', Fa.FaWallet],
  ['shield', Fi.FiShield],
  ['qrcode', Bs.BsQrCodeScan],
  ['mappin', Fi.FiMapPin],
  ['tag', Fi.FiTag],
  ['volume', Fi.FiVolume2],
  ['satellite', Md.MdSatelliteAlt],
  ['dollar', Fi.FiDollarSign],
  ['megaphone', Md.MdOutlineCampaign],
  ['truck', Fi.FiTruck],
  ['store', Fi.FiShoppingBag],
  ['barchart', Fi.FiBarChart2],
  ['grad', Fa.FaGraduationCap],
  ['briefcase', Fi.FiBriefcase],
  ['home', Fi.FiHome],
  ['plane', Fi.FiSend],
  ['building', Fi.FiBriefcase],
  ['check', Fi.FiCheckCircle],
  ['bulb', Fi.FiZap],
  ['rocket', Fa.FaRocket],
  ['phone', Fi.FiSmartphone],
  ['bell', Fi.FiBell],
  ['trendup', Fi.FiTrendingUp],
  ['trenddown', Fi.FiTrendingDown],
  ['star', Fi.FiStar],
  ['alerttri', Fi.FiAlertTriangle],
  ['lock', Fi.FiLock],
  ['eye', Fi.FiEyeOff],
  ['message', Fi.FiMessageCircle],
  ['map', Fi.FiMap],
  ['layers', Fi.FiLayers],
  ['instagram', Fa.FaInstagram],
  ['google', Fa.FaGoogle],
  ['facebook', Fa.FaFacebook],
  ['tiktok', Fa.FaTiktok],
  ['gift', Fi.FiGift],
  ['award', Fi.FiAward],
  ['award2', Fi.FiAward], // Map award2 to the same award icon
  ['globe', Fi.FiGlobe],
  ['clipboard', Fi.FiClipboard],
  ['flag', Fi.FiFlag],
  ['heart', Fi.FiHeart],
  ['compass', Fi.FiCompass],
  ['cpu', Fi.FiCpu],
  ['puzzle', Gi.GiJigsawPiece],
  ['scale', Md.MdOutlineBalance],
  ['idcard', Fi.FiCreditCard],
  ['suitcase', Fi.FiBriefcase],
  ['pet', Fa.FaPaw],
  ['bike', Fa.FaBicycle],
  ['medical', Fa.FaBriefcaseMedical],
  ['nfc', Fi.FiWifi],
  ['network', Fi.FiShare2],
  ['arrow', Fi.FiArrowRight],
];

const colors = {
  navy: '15102B',
  purple: '8B5CF6',
  lavender: 'A78BFA',
  white: 'FFFFFF',
  dark: '1A1625',
  gold: 'F4B740',
  green: '34D399',
  red: 'F87171',
  slate: '6B7280',
};

async function run() {
  const destDir = path.join(__dirname, 'assets', 'icons');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const [name, Comp] of icons) {
    if (!Comp) {
      console.warn(`Warning: Icon component for "${name}" is not defined. Skipping.`);
      continue;
    }
    for (const [cname, hex] of Object.entries(colors)) {
      try {
        const svgStr = ReactDOMServer.renderToStaticMarkup(
          React.createElement(Comp, { size: 256, color: '#' + hex })
        );
        const outPath = path.join(destDir, `${name}_${cname}.png`);
        await sharp(Buffer.from(svgStr)).resize(256, 256).png().toFile(outPath);
      } catch (err) {
        console.error(`Error generating ${name} in color ${cname}:`, err);
      }
    }
  }
  console.log('done', icons.length * Object.keys(colors).length);
}

run();
