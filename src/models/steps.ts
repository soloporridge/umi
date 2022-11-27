/*
 * @Author: lileichao
 * @Date: 2022-11-09 19:03:20
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 17:19:38
 * @Description: 用于同伴互助
 * @Copyright: 深圳妙创医学有限公司2021
 */
import { useState, useCallback, useEffect } from 'react';
import type { scoringSectionListType } from '@/services/scoringManagement';
/* 

 {
      id: 0,
      scoringId: 1,
      title: '测试',
      scoringStep: [
        {
          id: 2,
          title: '子一及',
        },
      ],
    },

*/
export default () => {
  const [scoringId, setScoringId] = useState<number>();
  const [flag, setFlag] = useState<boolean>(false);
  const [selectedSteps, setSelectedSteps] = useState<any>('');
  const [scoringSectionList, setScoringSectionList] = useState<scoringSectionListType[]>([]); // 操作项数组
  const [current, setCurrent] = useState<any>();
  const setSteps = useCallback((val: any) => {
    setSelectedSteps(val);
  }, []);
  const setSectionList = useCallback((val: any[]) => {
    setFlag((state) => !state);
    setScoringSectionList(val);
  }, []);
  const setId = useCallback((val: number) => {
    setScoringId(val);
  }, []);
  const setCurrentFn = useCallback((val: any) => {
    setCurrent(val);
  }, []);
  useEffect(() => {
    console.log('scoringSectionList', scoringSectionList);
  }, [scoringSectionList]);
  return {
    selectedSteps,
    setSteps,
    scoringSectionList,
    setSectionList,
    flag,
    setId,
    scoringId,
    current,
    setCurrentFn,
  };
};
