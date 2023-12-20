import { env } from "./../../../common/env";
import { handleRes } from "./../../../common/extands";
import { inputDto } from "./data";

export const clueSvc = {
	find: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/leads/list`,
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
				url: env.prefix + `/leads/add`,
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
				url: env.prefix + `/leads/update`,
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
				url: env.prefix + `/leads/resetCommonPool`,
				data: {ids}
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},

	returnLabel: (key : string, target : string) => {
		const control = JSON.parse(JSON.stringify(inputDto[key]))[target];
	}
};