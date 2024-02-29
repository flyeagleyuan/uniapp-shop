<template>
	<view class="video-container">
		<video :src="videoUrl" :controls="true" :autoplay="true"></video>
	</view>
</template>

<script>
	export default {
		name: "PreviewPage",
		data() {
			return {
				videoUrl: "https://anonymity.oss-cn-shanghai.aliyuncs.com/video/class_infor.mp4"
			};
		}
	}
</script>

<style lang="scss" scoped>
	.video-container {
		height: 100%;
		width: 100%;
		// background: red;
		display: flex;
		justify-content: center;
		align-items: center;

		video {
			width: 100%;
		}
	}
</style>