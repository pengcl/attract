import { env } from "./../../../common/env";
import { handleRes } from "./../../../common/extands";

export const followSvc = {
	find: (leadsId: string) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method:"GET",
				url: env.prefix + `/leads/getLeadsBusinessRecordById`,
				data: {leadsId}
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
				url: env.prefix + `/leads/addCustomerFollowUpRecord`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	}
};