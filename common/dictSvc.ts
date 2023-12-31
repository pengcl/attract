import { env } from "./env";
import { handleRes } from "./extands";

let map = {};
let dicts : any[] = [];

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
	getOptions(code : string) {
		return dicts.filter(item => item.code === code);
	},
	setDicts: (data : any) => {
		dicts = data;
	},
	getDicts() {
		return dicts;
	},
	setMap: (data : any) => {
		map = data;
	},
	getMap() {
		return map;
	}
};