import {env} from "./env";
import {handleRes} from "./extands";

export const dictSvc = {
	options: (code:any) => {
		return new Promise((resolve,reject)=>{
			return uni.request({
				url: env.prefix + `/dict/api/list/${code}`,
				data: {}
			}).then((res:any)=>{
				return resolve(handleRes(res));
			});
		});
	  }
};