/* eslint-disable no-param-reassign */
/*
 * @Author: lileichao
 * @Date: 2022-11-21 13:57:04
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 18:02:10
 * @Description: file content
 * @Copyright: 深圳妙创医学有限公司2021
 */
// import type { scoringSectionListType, scoringStepType } from '@/services/scoringManagement';

export const sectionList = (
  arr: any, // scoringSectionListType || scoringStepType 递归导致数据不好定义
  id: number | string,
  type: 'add' | 'edit' | 'score' | 'delet',
  data: {
    step?: {
      id?: number;
      scoringId: number;
      title: string;
      scoringDeductionList: any[];
    };
    title?: string;
    score?: {
      id?: number;
      scoringId: number;
      title: string;
      score?: number;
      images?: string[] | [];
    };
    update?: {
      data: any;
    };
  },
): any[] => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      if (type === 'add') {
        arr[i].scoringStep?.push({
          ...data?.step,
          sort: arr[i].scoringStep?.length === 0 ? 1 : arr[i].scoringStep?.length,
        });
      } else if (type === 'score') {
        if (data?.update?.data) {
          arr[i].scoringDeductionList = data.update.data;
        } else {
          arr[i].scoringDeductionList.push({
            ...data?.score,
            sort:
              arr[i].scoringDeductionList?.length === 0
                ? 1
                : arr[i].scoringDeductionList?.length + 1,
            scoringSectionId: arr[i].id,
          });
        }
      } else if (type === 'delet') {
        arr = arr?.filter((item: any) => item.id !== id);
      } else {
        arr[i].title = data?.title;
      }
    } else {
      sectionList(arr[i]?.scoringStep ?? [], id, type, data);
    }
  }
  return arr;
};
