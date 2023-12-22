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
	pool: (data : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/leads/poolList`,
				data
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	relations: (leadsId : string) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "GET",
				url: env.prefix + `/leads/getLeadsRelationDataById`,
				data: { leadsId }
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
	unique: (customerName : string) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/leads/duplicateCheck`,
				data: { customerName }
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
	distribute: (leadsId : any, consultantId : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/leads/assignLeads`,
				data: { leadsId, consultantId }
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	distributes: (leadsId : any, consultantAndAssignNum : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/leads/batchAssignLeads`,
				data: { leadsId, consultantAndAssignNum }
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
				data: { ids }
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},

	returnLabel: (key : string, target : string) => {
		const control = JSON.parse(JSON.stringify(inputDto[key]))[target];
	}
};