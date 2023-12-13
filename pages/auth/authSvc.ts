import { env } from "./../../common/env";
import { handleRes } from "./../../common/extands";

export const authSvc = {
	login: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method:"POST",
				url: env.prefix + `/auth/login`,
				dataType: 'application/json',
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	item: (id : string) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method:"GET",
				url: env.prefix + `/leads/getDataById`,
				data: {id}
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	create: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method:"POST",
				url: env.prefix + `/leads/add`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	}
};