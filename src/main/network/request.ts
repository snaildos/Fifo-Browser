/* Copyright (c) 2021-2022 SnailDOS */

import * as http from 'http';
import * as https from 'https';
import { ResponseDetails } from '~/common/rpc/network';
import { URL } from 'url';

export const requestURL = (url: string): Promise<ResponseDetails> =>
  new Promise((resolve, reject) => {
    const options = new URL(url);

    let { request } = http;

    if (options.protocol === 'https:') {
      request = https.request;
    }

    const req = request(options, (res) => {
      let data = '';
      res.setEncoding('binary');

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data,
        });
      });

      res.on('error', (e) => {
        reject(e);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });