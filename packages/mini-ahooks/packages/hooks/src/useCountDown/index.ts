import dayjs from 'dayjs';
import { useEffect, useState, useMemo } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';
export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
const calcLeft = (target?: TDate) => {
  if (!target) return 0;
  // valueOf:This returns the number of milliseconds since the Unix Epoch of the Day.js object.
  const left = dayjs(target).valueOf() - Date.now();
  return left < 0 ? 0 : left;
};
const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountdown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};
  const target = useMemo<TDate>(() => {
    // 如果参数中有leftTime属性，用当前的时间戳加leftTime作为目标日期
    // leftTime优先级高于targeDate
    if ('leftTime' in options) {
      return isNumber(leftTime) && leftTime > 0
        ? Date.now() + leftTime
        : undefined;
    } else {
      return targetDate;
    }
  }, [leftTime, targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));
  const onEndRef = useLatest(onEnd);
  useEffect(() => {
    if (!target) {
      setTimeLeft(0);
      return;
    }
    // 立即执行一次
    setTimeLeft(calcLeft(target));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;
/**
 * useMemo
 * 返回一个 memoized 值。

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行不应该在渲染期间内执行的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
 */
