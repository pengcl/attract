import { env } from "./../../common/env";
import { handleRes } from "./../../common/extands";

export const companySvc = {
	find: (name : any) => {
		return new Promise((resolve, reject) => {
			return uni.request({
				method: "POST",
				url: env.prefix + `/enterprise/advSearch`,
				data: { name }
			}).then((res : any) => {
				return resolve(handleRes(res));
			});
		});
	}
};