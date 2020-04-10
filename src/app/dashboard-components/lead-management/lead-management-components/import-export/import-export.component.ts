import { LeadService } from '../../../../services/lead.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import config from './../../../../../assets/js/config';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {
  formData: any;
  isDownloadReady = false;
  downloadData = '';
  downloadLinkName = 'leads.csv';

  constructor(private fb: FormBuilder, private ls: LeadService) {

  }

  ngOnInit() {
    this.formData = this.fb.group({
      file: ['', []]
    });
  }

  async export() {
    const response = await this.ls.export();
    if (response.status === 200) {
      this.isDownloadReady = true;
      this.downloadData = response.data;
    }
  }

  submit() {

  }

  download() {
    const blob = new Blob([this.downloadData], { type: 'text/csv' });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, this.downloadLinkName);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = this.downloadLinkName;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }

}
