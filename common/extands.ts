export const handleError = (err : any) => {
	console.log(err);
	uni.showModal({
		content: err,
		showCancel: false
	})
}

export const handleRes = (res : any) => {
	const err = res[0];
	res = res[1];
	if (err) { handleError(err) };
	if (res.data.code === '200') {
		return res.data.data;
	} else {
		console.log(res);
		let error = res.data;
		if(typeof res.data === 'string'){
			error = JSON.parse(res.data);
		}
		handleError(error.msg);
		return null
	}
}