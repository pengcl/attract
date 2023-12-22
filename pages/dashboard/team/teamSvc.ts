import { env } from "./../../../common/env";
import { handleRes } from "./../../../common/extands";

export const teamSvc = {
	find: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/team/GetTeamInfoList`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	members: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/team/memberList`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	unique: (phone : string) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "GET",
				url: env.prefix + `/contacts/duplicateCheck`,
				data: { phone }
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	item: (id : string) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "GET",
				url: env.prefix + `/contacts/getDataById`,
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
				url: env.prefix + `/contacts/add`,
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
				url: env.prefix + `/contacts/update`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	}
};