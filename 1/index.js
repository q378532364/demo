const video = document.getElementById('video')

// 这里必须 用await等待
const play = async () => {
  try {
    await video.play()
    //  取消静音静音
    video.muted = false
  }
  catch (err) {
    document.getElementsByClassName("mask")[0].classList.add("on")
    // 设置静音
    video.muted = true
    video.play()
  }
}

play()

document.getElementById("btn").addEventListener("click", () => {
  play()
})