import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';
import * as echarts from 'echarts';
import nodeHtmlToImage from 'node-html-to-image';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import { QuastionService } from 'src/question/question.service';

@Injectable()
export class MailReportService {
  constructor(private readonly quastionService: QuastionService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateEchartCanvas(option: any) {
    const canvas = createCanvas(700, 700);
    canvas.getContext('2d');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chart = echarts.init(canvas as any);

    chart.setOption(option);

    return canvas.toBuffer('image/png');
  }

  async generateImage(html: string) {
    return await nodeHtmlToImage({
      html: html.toString(),
      puppeteerArgs: {
        args: ['--disable-gpu', '--no-sandbox', '--lang=en-US', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      },
    });
  }

  async createPdfInOneFile() {
    const questions = await this.quastionService.getAllQuestions();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const charts = questions.map(() => {
      return this.generateEchartCanvas(this.setEchartOption());
    });

    const pdfDoc = new PDFDocument();
    const filePath = './chart.pdf';
    const out = fs.createWriteStream(filePath);

    pdfDoc.pipe(out);
    charts.forEach((img) => {
      console.log('work');
      pdfDoc.image(img, 50, 50, { width: 260 });
      pdfDoc.text('Some text with an embedded font!', 50, 310);
      pdfDoc.addPage();
    });
    pdfDoc.end();

    await new Promise((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });

    return filePath;
  }

  setEchartOption() {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [1, 2, 3, 4, 5],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [6, 3, 2, 6, 7],
        },
      ],
    };
  }
}
