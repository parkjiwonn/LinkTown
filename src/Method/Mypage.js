// serviceUtils.js
import {IsDuplicateNick} from '../API/Account.js'

export function toggleService(
    selectedServicesIndex,
    selectedServices,
    service,
    index
) {
    if (selectedServicesIndex.includes(index)) {
        return { selectedServicesIndex, selectedServices }; // 변화 없음
    } else {
        selectedServicesIndex.push(index);
        selectedServices.push(service);
        return { selectedServicesIndex, selectedServices };
    }
}

export function removeService(
    selectedServicesIndex,
    selectedServices,
    services,
    index
) {
    selectedServicesIndex = selectedServicesIndex.filter((i) => i !== index);
    const service = services[index];
    const idx = selectedServices.indexOf(service);
    if (idx > -1) {
        selectedServices.splice(idx, 1);
    }
    return { selectedServicesIndex, selectedServices };
}

export async function CheckDuplicateNick(original_nick, user_nick) {
    console.log("IsDuplicateNick() 들어옴 :", user_nick);

    if (original_nick === user_nick) {
        return {
            IsDuplicatedNick: false,
            DuplicateMessage: "",
        };
    } else {
        const result = await IsDuplicateNick(user_nick);
        console.log("IsDuplicateNick() result:", result);
        if (result.res_code === "0") {
            return {
                IsDuplicatedNick: false,
                DuplicateMessage: "사용가능한 닉네임입니다.",
            };
        } else {
            return {
                IsDuplicatedNick: true,
                DuplicateMessage: "중복되는 닉네임입니다.",
            };
        }
    }
}


