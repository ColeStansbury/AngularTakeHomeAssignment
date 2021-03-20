import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {
  public NavBrand: string;
  public Pages: Array<{ title: string, link: string }>;
  public ActiveLink: string;

  constructor(private router: Router) {
    this.Pages = [{title: 'Part 1', link: '/part1'},
      {title: 'Part 2', link: '/part2'}];
    this.ActiveLink = this.Pages[0].link;
    this.NavBrand = 'Angular Take Home Assignment';
  }

  ngOnInit(): void {
  }

}
