import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
  
import { HttpClient } from '@angular/common/http';
import { File } from "@ionic-native/file/ngx";
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider {
	server: string = "http://192.168.18.3:8080/publicworksServer/"; 

	constructor(private http : Http, private file:File,private httpClient:HttpClient) {
		
		
	}

	postData(body, file){
		let type = "application/json; charset=UTF-8";
		let headers = new Headers({ 'Content-Type': type });
		
		let options = new RequestOptions({ headers: headers });
		new Blob()
		return this.http.post(this.server + file, JSON.stringify(body), options)
		.map(res => res.json());
	}

	async postUpload(file:string, fileUrl:string, body?:any){

		let formData = new FormData()
		
	
		let blobImg = await this.makeFileIntoBlob(fileUrl)
		console.log(this.getBlob(blobImg))
		formData.append('file', this.getBlob(blobImg), 'arq')
		
	
		if(body!=undefined){
			for(let key of Object.keys(body)){
				
				formData.append(key, body[key])
			}
		}
		return new Promise((response,error)=>{
			this.httpClient.post(this.server + file,formData)
			.subscribe( (res) => {
			  console.log(formData)
			  console.log(formData.get('file'))
			  response(res);
			},(err) => {
			  error(err);
			});
		  });
		
	}

	async postMultiUpload(file:string, fileUrl:any, body?:any){

		let formData = new FormData()
		
		for(let arq of fileUrl){
			console.log(arq)
			let blobImg = await this.makeFileIntoBlob(arq)
			console.log(blobImg)
			formData.append('file[]', this.getBlob(blobImg), 'arq')
		}
	
		if(body!=undefined){
			for(let key of Object.keys(body)){
				
				formData.append(key, body[key])
			}
		}
		return new Promise((response,error)=>{
			this.httpClient.post(this.server + file,formData)
			.subscribe( (res) => {
			
			  response(res);
			},(err) => {
			  error(err);
			});
		  });
		
	}

	makeFileIntoBlob(_imagePath) {
		// INSTALL PLUGIN - cordova plugin add cordova-plugin-file
		return new Promise((resolve, reject) => {
		  let fileName = "";
		  this.file
			.resolveLocalFilesystemUrl(_imagePath)
			.then(fileEntry => {
			  let { name, nativeURL } = fileEntry;
	
			  // get the path..
			  let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
	
			  fileName = name;
	
			  // we are provided the name, so now read the file into a buffer
			  return this.file.readAsArrayBuffer(path, name);
			})
			.then(buffer => {
			  // get the buffer and make a blob to be saved
			  let imgBlob = new Blob([buffer], {
				type: "image/jpeg"
			  });
			  
			  // pass back blob and the name of the file for saving
			  // into fire base
			  resolve({
				fileName,
				imgBlob
			  });
			})
			.catch(e => reject(e));
		});
	  }

  private getBlob(blob){
		return blob.imgBlob
	}
	
}