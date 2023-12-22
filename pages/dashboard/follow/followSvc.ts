import { env } from "./../../../common/env";
import { handleRes } from "./../../../common/extands";


const titleCase = (s : string) => {
	const ss = s.toLowerCase().split(/\s+/);
	for (let i = 0; i < ss.length; i++) {
		ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1);
	}
	return ss.join(' ');
}

export const followSvc = {
	find: (id : string, type : string) => {
		return new Promise((resolve, reject) => {
			const data : any = {};
			data[`${type}Id`] = id;
			return uni.request({
				method: "GET",
				url: env.prefix + `/${type}/get${titleCase(type)}BusinessRecordById`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	item: (id : string) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "GET",
				url: env.prefix + `/leads/getDataById`,
				data: { id }
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	create: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/leads/addCustomerFollowUpRecord`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	}
};