import express from 'express';

export const func = (x) => new Promise(resolve => {
    setTimeout(() => {
        console.log('in setTimeout');
        resolve(x);
    }, 2000);
});