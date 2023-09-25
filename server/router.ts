import * as trpc from '@trpc/server';
import { z } from 'zod';
import puppeteer from 'puppeteer-core';

let browser;
export const appRouter = trpc
  .router()
  .mutation('greet', {
    input: z.object({
      name: z.string()
    }),
    async resolve({ input }) {
      // server.log.error(err);
      browser = await puppeteer.launch({
        headless: false,
        // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        channel: 'chrome',
        // userDataDir: ''
      });

      const pages = await browser.pages();
      const page = await browser.newPage();
      setInterval(() => {
        pages?.[0]?.reload()
      }, 5000)
      // Navigate the page to a URL
      await page.goto('https://www.baidu.com/');
      return `"Hello, ${input.name}! You've been greeted from NodeJS!"`; // input type is string
    },
  });

export type AppRouter = typeof appRouter;
