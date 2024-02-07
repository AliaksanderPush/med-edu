import { Controller, Get, Res } from '@nestjs/common';
import { MailReportService } from './mail-report.service';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('mail-report')
export class MailReportController {
  constructor(private mailService: MailReportService) {}

  @Get()
  async generateChart(@Res() res: Response) {
    let filePath: any;
    try {
      filePath = await this.mailService.createPdfInOneFile();

      res.setHeader('Content-disposition', 'attachment; filename=chart.pdf');
      res.setHeader('Content-type', 'application/pdf');

      res.sendFile(filePath, { root: process.cwd() }, (err) => {
        if (err) {
          console.error(err);
        }
        fs.unlinkSync(filePath);
      });
    } catch (err) {
      console.log('Error generating PDF:', err);
      throw err;
    }
  }
}
