import { Component, OnInit } from '@angular/core';
// APP
import { FilesService } from '../../../../services/files.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-processfiles',
  templateUrl: './processfiles.component.html',
  styleUrls: ['./processfiles.component.css']
})
export class ProcessfilesComponent implements OnInit {

  files: Array<File>;
  state: String;

  constructor(private filesService: FilesService) { }

  ngOnInit() {
    this.files = [];
    this.state = 'A';
  }

  onChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (!event.target.files[i]['name'].endsWith('.xml')) {
        alert('El archivo "' + event.target.files[i]['name'] + '" no es xml');
      } else {
        this.files.push(<File> event.target.files[i]);
      }
    }
  }

  onRemoveUpload(event) {
    let buttonElement = event.target;
    while (buttonElement.tagName !== 'BUTTON') {
      buttonElement = buttonElement.parentNode;
    }
    this.files.splice(buttonElement.getAttribute('data-index'), 1);
  }

  onSubmit() {
    this.state = 'P';
    const formData: any = new FormData();
    formData.append('type', 'XMLTOCSV');
    for (let i = 0; i < this.files.length; i++) {
      formData.append('files_in', this.files[i], this.files[i]['name']);
    }

    this.filesService.getTransformedXML(formData).subscribe(
      (res) => {
        ///////////// To download the file on site (doesn't work for everybody) //////////////////////////
        // const filename = 'traux.csv';
        // const blob = new Blob([res['data']], {type: 'text/text'});
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //   window.navigator.msSaveOrOpenBlob(blob, filename);
        // } else {
        //   const e = document.createEvent('MouseEvents'), a = document.createElement('a');
        //   a.download = filename;
        //   a.href = window.URL.createObjectURL(blob);
        //   a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        //   e.initEvent('click', true, false);
        //   a.dispatchEvent(e);
        // }
        this.state = 'S';
      },
      (err) => {
        if (!environment.production) {
          console.log('ERROR:');
          console.log(err);
        }
        this.state = 'E';
      }
    );
  }

}


