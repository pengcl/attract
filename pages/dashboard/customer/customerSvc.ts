import { env } from "./../../../common/env";
import { handleRes } from "./../../../common/extands";

export const customerSvc = {
	find: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/customer/list`,
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
				url: env.prefix + `/customer/getDataById`,
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
				url: env.prefix + `/customer/add`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	update: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/customer/update`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	inPool: (ids : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/customer/resetCommonPool`,
				data: {ids}
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	}
};