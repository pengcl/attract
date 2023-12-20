import { env } from "./env";
import { handleRes } from "./extands";

let map = {};

export const dictSvc = {
	options: (code : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				url: env.prefix + `/dict/list/${code}`,
				data: {}
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	all: () => {
		return new Promise((resolve, reject) => {
			return uni.request({
				url: env.prefix + `/dict/lists`,
				method: "POST"
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	},
	setMap: (data : any) => {
		map = data;
	},
	getMap(){
		return map;
	}
};