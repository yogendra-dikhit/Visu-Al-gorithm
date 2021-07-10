import { Component, OnInit } from '@angular/core';
import {  } from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { 
    $(document).on("click",'a',function(){
      if(! $(this).hasClass('active')){
        $('.nav-links').find('.active').removeClass('active');
        $(this).addClass('active');
      }
    });
  }

  ngOnInit(): void {
  }

}
