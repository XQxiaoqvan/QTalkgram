import lottie from 'lottie-web'
import pako from 'pako'

export async function loadAnimation(container, animationPath) {
  try {
    const response = await fetch(animationPath)
    const arrayBuffer = await response.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    const decompressedData = pako.inflate(data, { to: 'string' })
    const animationData = JSON.parse(decompressedData)

    lottie.loadAnimation({
      container: container.value,
      animationData: animationData,
      renderer: 'canvas',
      loop: true,
      autoplay: true
    })
  } catch (error) {
    console.error('Error loading animation:', error)
  }
}
