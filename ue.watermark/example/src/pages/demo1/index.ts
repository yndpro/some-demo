
// import Scrollbar from '@ued/scrollbar'
import { createWaterMark } from '../../../../release/index.js';

document.querySelector("input").onchange = function () {
	change(this);
}

function change(target) {
	const file = target.files[0];
	const formatReg = /\.(jpg|jpeg|png)$/i;

	if (!file) {
		return;
	}

	if (file.name.search(formatReg) === -1) {
		alert("请选择正确的文件类型");
		return;
	}

	if (file.size / 1024 / 1024 > 4) {
		alert("图片大小不能超过4M哦~");
		return;
	}

	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function (event) {
		createWaterMark({
			dataSource: event.target.result,
			dataSourceType: "base64",
			content: "仅供4399UED使用",
			success: base64Url => {
				document.querySelector("img").src = base64Url;
			}
		})
	};
}

