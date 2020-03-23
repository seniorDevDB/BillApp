export default function Encryption(str) {
  return str
    .split('')
    .map(l => l.charCodeAt(0).toString(2))
    .join(' ');
}
