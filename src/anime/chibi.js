// Mini-Maram en style anime japonais (chibi) : illustration vectorielle dessinée sur canvas,
// animée image par image (marche, course, clignement, salut, cheveux qui ondulent).
export const CHIBI = { W: 512, H: 800 }

const C = {
  line: '#3a2219', skin: '#fde4d4', skinSh: '#f4c3ad', blush: 'rgba(255,128,140,0.45)',
  hair: '#2b1912', hairSh: '#1c0f0a', hairHi: '#6b4636',
  irisTop: '#2a120a', irisMid: '#7a3f1d', irisBot: '#d9944f',
  blouse: '#fff8ef', blouseSh: '#eadbc8', skirt: '#b07a4e', skirtSh: '#8c5b36',
  belt: '#5b3a24', gold: '#e3b24f', sock: '#ffffff', shoe: '#5b3524', lips: '#c0656a',
}

function stroke(ctx, w = 4) { ctx.lineWidth = w; ctx.strokeStyle = C.line; ctx.stroke() }
function ell(ctx, x, y, rx, ry, r = 0) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, r, 0, Math.PI * 2) }

function limb(ctx, pts, w, color) {
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts.slice(1)) ctx.lineTo(p[0], p[1])
  ctx.lineWidth = w + 8; ctx.strokeStyle = C.line; ctx.stroke()
  ctx.lineWidth = w; ctx.strokeStyle = color; ctx.stroke()
}

function eye(ctx, x, y, sg, blink) {
  if (blink) {
    // yeux fermés « heureux » ^ ^
    ctx.beginPath(); ctx.moveTo(x - 28, y + 6); ctx.quadraticCurveTo(x, y - 18, x + 28, y + 6)
    ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.line; ctx.stroke()
    return
  }
  // blanc
  ell(ctx, x, y + 2, 31, 40); ctx.fillStyle = '#fff'; ctx.fill()
  ctx.save(); ell(ctx, x, y + 2, 31, 40); ctx.clip()
  // iris dégradé
  const g = ctx.createLinearGradient(0, y - 36, 0, y + 40)
  g.addColorStop(0, C.irisTop); g.addColorStop(0.45, C.irisMid); g.addColorStop(1, C.irisBot)
  ell(ctx, x + sg * 2, y + 8, 26, 36); ctx.fillStyle = g; ctx.fill()
  ctx.lineWidth = 3; ctx.strokeStyle = '#1a0905'; ctx.stroke()
  ell(ctx, x + sg * 2, y + 6, 11, 17); ctx.fillStyle = '#140704'; ctx.fill()
  // reflet bas
  ell(ctx, x + sg * 2, y + 30, 18, 7); ctx.fillStyle = 'rgba(255,214,160,.55)'; ctx.fill()
  // ombre de paupière
  ctx.fillStyle = 'rgba(60,25,15,.25)'; ctx.fillRect(x - 40, y - 42, 80, 16)
  ctx.restore()
  // reflets brillants
  ell(ctx, x - 9, y - 10, 9, 12, -0.3); ctx.fillStyle = '#fff'; ctx.fill()
  ell(ctx, x + 11, y + 14, 4, 4); ctx.fill()
  ell(ctx, x + 3, y - 18, 2.5, 2.5); ctx.fill()
  // ligne de cils épaisse + pointe
  ctx.beginPath()
  ctx.moveTo(x - sg * 34, y - 10)
  ctx.quadraticCurveTo(x, y - 50, x + sg * 36, y - 16)
  ctx.lineTo(x + sg * 46, y - 26)
  ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = '#1d0c07'; ctx.stroke()
  ctx.lineWidth = 4
  ctx.beginPath(); ctx.moveTo(x + sg * 34, y - 18); ctx.lineTo(x + sg * 47, y - 14); ctx.stroke()
  // cils du bas
  ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(x + sg * 14, y + 41); ctx.quadraticCurveTo(x + sg * 26, y + 38, x + sg * 31, y + 26); ctx.stroke()
}

/** Dessine Mini-Maram. s = { t, walk, run, blink, wave, sway } */
export function drawChibi(ctx, s = {}) {
  const { t = 0, walk = 0, run = false, blink = false, wave = false } = s
  const { W, H } = CHIBI
  ctx.clearRect(0, 0, W, H)
  ctx.save()
  const f = run ? 14 : 9
  const ph = t * f
  const sw = walk ? Math.sin(ph) : 0
  const bob = walk ? Math.abs(Math.sin(ph)) * (run ? 16 : 9) : Math.sin(t * 2.2) * 3
  const sway = Math.sin(t * 1.6) * 4 + sw * 6
  ctx.translate(0, -bob)
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'

  // ── cheveux arrière (longs, pointes)
  ctx.beginPath()
  ctx.moveTo(256, 92)
  ctx.bezierCurveTo(430, 92, 448, 230, 440, 330)
  ctx.bezierCurveTo(436, 430, 452 + sway, 520, 432 + sway, 600 + sw * 4)
  ctx.lineTo(400 + sway, 572); ctx.lineTo(380 + sway, 620); ctx.lineTo(352 + sway * 0.8, 585)
  ctx.lineTo(256, 610)
  ctx.lineTo(160 + sway * 0.8, 585); ctx.lineTo(132 + sway, 620); ctx.lineTo(112 + sway, 572)
  ctx.lineTo(80 + sway, 600 - sw * 4)
  ctx.bezierCurveTo(60 + sway, 520, 76, 430, 72, 330)
  ctx.bezierCurveTo(64, 230, 82, 92, 256, 92)
  ctx.fillStyle = C.hairSh; ctx.fill(); stroke(ctx, 5)

  // ── jambes
  const hipY = 625
  for (const [sg, a] of [[-1, sw], [1, -sw]]) {
    const hx = 256 + sg * 24
    const ang = a * (run ? 0.6 : 0.42)
    const kx = hx + Math.sin(ang) * 70, ky = hipY + Math.cos(ang) * 70
    const ax = kx + Math.sin(ang * 0.5) * 72, ay = ky + Math.cos(ang * 0.5) * 72
    limb(ctx, [[hx, hipY], [kx, ky], [ax, ay]], 26, C.skin)
    limb(ctx, [[kx + (ax - kx) * 0.55, ky + (ay - ky) * 0.55], [ax, ay]], 27, C.sock)
    ell(ctx, ax + 6, ay + 14, 24, 13); ctx.fillStyle = C.shoe; ctx.fill(); stroke(ctx, 4)
    ell(ctx, ax + 12, ay + 9, 7, 3); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill()
  }

  // ── bras arrière (gauche du personnage = droite de l'image)
  const shoulderY = 432
  const armSwing = sw * (run ? 0.9 : 0.55)
  const drawArm = (sg, angle, bend) => {
    const sx = 256 + sg * 54
    const ex = sx + Math.sin(angle) * 62 * sg, ey = shoulderY + Math.cos(angle) * 62
    const a2 = angle + bend
    const hx = ex + Math.sin(a2) * 58 * sg, hy = ey + Math.cos(a2) * 58
    limb(ctx, [[sx, shoulderY], [ex, ey]], 30, C.blouse)
    limb(ctx, [[ex, ey], [hx, hy]], 20, C.skin)
    ell(ctx, hx, hy, 13, 13); ctx.fillStyle = C.skin; ctx.fill(); stroke(ctx, 4)
  }

  // ── buste : blouse
  ctx.beginPath()
  ctx.moveTo(206, 420); ctx.quadraticCurveTo(256, 404, 306, 420)
  ctx.quadraticCurveTo(318, 480, 304, 552); ctx.lineTo(208, 552)
  ctx.quadraticCurveTo(194, 480, 206, 420); ctx.closePath()
  ctx.fillStyle = C.blouse; ctx.fill(); stroke(ctx, 4)
  ctx.beginPath(); ctx.moveTo(214, 520); ctx.quadraticCurveTo(256, 540, 298, 520); ctx.lineTo(304, 552); ctx.lineTo(208, 552); ctx.closePath()
  ctx.fillStyle = C.blouseSh; ctx.fill()
  // col en V + nœud
  ctx.beginPath(); ctx.moveTo(234, 414); ctx.lineTo(256, 452); ctx.lineTo(278, 414); ctx.fillStyle = C.skin; ctx.fill(); stroke(ctx, 3)
  ctx.beginPath(); ctx.moveTo(256, 452); ctx.lineTo(244, 470); ctx.lineTo(256, 462); ctx.lineTo(268, 470); ctx.closePath(); ctx.fillStyle = '#d06a8a'; ctx.fill(); stroke(ctx, 3)

  // ── jupe plissée + ceinture
  const sk = Math.sin(t * 2) * 2 + sw * 5
  ctx.beginPath()
  ctx.moveTo(208, 548); ctx.lineTo(304, 548)
  ctx.lineTo(338 + sk, 640); ctx.quadraticCurveTo(256, 662, 174 + sk, 640); ctx.closePath()
  ctx.fillStyle = C.skirt; ctx.fill(); stroke(ctx, 4)
  ctx.strokeStyle = C.skirtSh; ctx.lineWidth = 3
  for (const k of [-2, -1, 0, 1, 2]) { ctx.beginPath(); ctx.moveTo(256 + k * 18, 560); ctx.lineTo(256 + k * 32 + sk * 0.6, 648); ctx.stroke() }
  ctx.beginPath(); ctx.rect(206, 538, 100, 16); ctx.fillStyle = C.belt; ctx.fill(); stroke(ctx, 3)
  ctx.beginPath(); ctx.rect(247, 536, 18, 20); ctx.fillStyle = C.gold; ctx.fill(); stroke(ctx, 3)

  // bras : balancement en marche, salut ou main sur la hanche en pose
  if (wave && !walk) {
    drawArm(-1, 0.25 + Math.sin(t * 1.5) * 0.05, -0.15)
    drawArm(1, Math.PI - 0.6, -0.5 + Math.sin(t * 10) * 0.45)
  } else {
    drawArm(-1, 0.18 + armSwing, walk ? -0.3 : -0.12)
    drawArm(1, 0.18 - armSwing, walk ? -0.3 : -0.12)
  }

  // ── cou + tête
  ctx.beginPath(); ctx.rect(240, 380, 32, 40); ctx.fillStyle = C.skinSh; ctx.fill()
  ctx.save()
  ctx.translate(256, 400); ctx.rotate(walk ? sw * 0.03 : Math.sin(t * 1.1) * 0.04); ctx.translate(-256, -400)
  ctx.beginPath()
  ctx.moveTo(112, 250)
  ctx.bezierCurveTo(108, 120, 404, 120, 400, 250)
  ctx.bezierCurveTo(398, 330, 330, 396, 256, 404)
  ctx.bezierCurveTo(182, 396, 114, 330, 112, 250)
  ctx.fillStyle = C.skin; ctx.fill(); stroke(ctx, 5)

  // joues
  for (const sg of [-1, 1]) {
    ell(ctx, 256 + sg * 92, 330, 28, 14); ctx.fillStyle = C.blush; ctx.fill()
    ctx.strokeStyle = 'rgba(230,90,100,.55)'; ctx.lineWidth = 2.5
    for (const k of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(256 + sg * 92 + k * 10 - 4, 334); ctx.lineTo(256 + sg * 92 + k * 10 + 4, 326); ctx.stroke() }
  }
  // yeux
  eye(ctx, 194, 280, -1, blink)
  eye(ctx, 318, 280, 1, blink)
  // sourcils
  ctx.lineWidth = 4; ctx.strokeStyle = '#3a2219'
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(256 + sg * 34, 218); ctx.quadraticCurveTo(256 + sg * 62, 204, 256 + sg * 92, 214); ctx.stroke() }
  // nez
  ctx.beginPath(); ctx.moveTo(254, 330); ctx.lineTo(258, 334); ctx.strokeStyle = '#d58f7a'; ctx.lineWidth = 3; ctx.stroke()
  // bouche : petit sourire ouvert
  ctx.beginPath(); ctx.moveTo(238, 352); ctx.quadraticCurveTo(256, 356, 274, 352); ctx.quadraticCurveTo(268, 374, 256, 375); ctx.quadraticCurveTo(244, 374, 238, 352)
  ctx.fillStyle = '#9b3f44'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke()
  ctx.beginPath(); ctx.moveTo(246, 368); ctx.quadraticCurveTo(256, 362, 266, 368); ctx.quadraticCurveTo(256, 375, 246, 368); ctx.fillStyle = '#f08a96'; ctx.fill()

  // ── frange (raie au milieu, mèches en pointes)
  for (const sg of [-1, 1]) {
    const X = (x) => 256 + sg * x
    ctx.beginPath()
    ctx.moveTo(X(2), 100)
    ctx.bezierCurveTo(X(70), 96, X(160), 120, X(168), 240)
    // mèches arrondies : chaque pointe est reliée par des courbes (style anime)
    const pts = [[168, 240], [148, 212], [140, 262], [116, 208], [98, 240], [80, 190], [56, 218], [40, 168], [18, 180]]
    for (let k = 1; k < pts.length; k++) {
      const [ax, ay] = pts[k - 1], [bx, by] = pts[k]
      const tip = by > ay
      ctx.quadraticCurveTo(X(tip ? ax - 2 : bx + (ax - bx) * 0.15), tip ? ay + (by - ay) * 0.35 : by + (ay - by) * 0.75, X(bx), by)
    }
    ctx.quadraticCurveTo(X(8), 130, X(2), 100)
    ctx.closePath(); ctx.fillStyle = C.hair; ctx.fill(); stroke(ctx, 4)
    // longue mèche latérale qui tombe devant l'épaule
    const sx = sway * 0.6
    ctx.beginPath()
    ctx.moveTo(X(150), 170)
    ctx.bezierCurveTo(X(176), 260, X(170), 380, X(166) + sx, 470)
    ctx.lineTo(X(150) + sx, 520)
    ctx.lineTo(X(140) + sx, 470)
    ctx.bezierCurveTo(X(138), 380, X(140), 280, X(128), 200)
    ctx.closePath(); ctx.fillStyle = C.hair; ctx.fill(); stroke(ctx, 4)
    // créole dorée
    ell(ctx, X(134), 352, 9, 13); ctx.lineWidth = 4; ctx.strokeStyle = C.gold; ctx.stroke()
  }
  // reflets « angel ring »
  ctx.strokeStyle = C.hairHi; ctx.lineWidth = 7; ctx.lineCap = 'round'
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.arc(256, 232, 112, Math.PI * 1.5 + sg * 0.3, Math.PI * 1.5 + sg * 0.75, sg < 0); ctx.stroke() }
  ctx.restore()
  ctx.restore()
}

let portrait
/** Portrait (tête) pour l'interface. */
export function chibiPortrait() {
  if (portrait) return portrait
  const c = document.createElement('canvas'); c.width = CHIBI.W; c.height = CHIBI.H
  drawChibi(c.getContext('2d'), { t: 0 })
  const p = document.createElement('canvas'); p.width = p.height = 360
  const pc = p.getContext('2d')
  const bg = pc.createRadialGradient(180, 150, 20, 180, 180, 220)
  bg.addColorStop(0, '#fff3f8'); bg.addColorStop(1, '#f2c9dc')
  pc.fillStyle = bg; pc.fillRect(0, 0, 360, 360)
  pc.drawImage(c, 56, 70, 400, 400, 0, 0, 360, 360)
  portrait = p.toDataURL('image/png')
  return portrait
}

const fullCache = {}
/** Illustration en pied (pour les combats). pose : 'idle' | 'attack' */
export function chibiFull(pose = 'idle') {
  if (fullCache[pose]) return fullCache[pose]
  const c = document.createElement('canvas'); c.width = CHIBI.W; c.height = CHIBI.H
  drawChibi(c.getContext('2d'), { t: pose === 'attack' ? 0.15 : 0, wave: pose === 'attack' })
  fullCache[pose] = c.toDataURL('image/png')
  return fullCache[pose]
}
