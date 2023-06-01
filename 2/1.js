const ele = document.getElementById('audio')
const cvs = document.getElementById('cvs')
const ctx = cvs.getContext('2d')
const initCvs = () => {
  cvs.width = window.innerWidth / 2
  cvs.height = window.innerHeight / 2
}

initCvs()

let analyser, dataArr, isInit = false

ele.onplay = () => {

  if (isInit) {
    return
  }
  // q:帮我解释下面代码是干什么的？
  // a:创建一个音频上下文对象，用于管理音频，包括音频的播放，音频的分析等
  const oCtx = new AudioContext()
  const audioSrc = oCtx.createMediaElementSource(ele)
  // 分析器
  analyser = oCtx.createAnalyser()
  analyser.fftSize = 512

  // 创建结点，用于接收分析器节点分析的数据

  // q:帮我解释下面代码是干什么的？
  // a:将音频源节点连接到分析器节点，分析器节点连接到目标节点
  dataArr = new Uint8Array(analyser.frequencyBinCount)
  console.log("data", dataArr)
  audioSrc.connect(analyser)
  analyser.connect(oCtx.destination)


  isInit = true
}

function draw () {
  requestAnimationFrame(draw)
  const { width, height } = cvs
  ctx.clearRect(0, 0, width, height)
  if (!isInit) {
    return
  }
  analyser.getByteFrequencyData(dataArr)
  console.log(dataArr)
  // 根据dataArr 用canvas绘制出频谱
  // 在好看点
  ctx.fillStyle = 'red'

  const w = width / dataArr.length
  for (let i = 0; i < dataArr.length; i++) {
    // q:为什么这要除以256?
    // a:因为dataArr的值是0-256之间的，而canvas的高度是0-600之间的，所以要转换一下

    // q:怎么将图表绘制x轴在中间？
    // a:将canvas的高度减去dataArr的值，就可以了


    const h = dataArr[i] / 256 * height - dataArr[i]
    ctx.fillRect(w * i, height - h, w * 0.6, h)
  }

}
draw()