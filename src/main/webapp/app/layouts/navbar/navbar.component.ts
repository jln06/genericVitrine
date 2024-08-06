import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { EditModeService } from '../../home/service/edit-mode.service';
import { scrollTo } from '../../shared/util/viewUtil';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  inProduction?: boolean;
  isNavbarCollapsed = false;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private updateModeService: EditModeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngAfterViewInit(): void {
    this.getHeaderHeight();
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollTo(fragment);
      }
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  collapseAndScroll(): void {
    this.collapseNavbar();
    this.scrollTo();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.removeOpenedNavClassBody();
  }

  scrollTo(idElement?: string): void {
    this.isNavbarCollapsed = false;
    this.removeOpenedNavClassBody();
    setTimeout(() => scrollTo(idElement, this.getHeaderHeight()));
  }

  removeOpenedNavClassBody(): void {
    const bodyElement = this.el.nativeElement.parentElement.parentElement;
    if (!this.isNavbarCollapsed) {
      this.renderer.removeClass(bodyElement, 'navOpened');
    } else {
      this.renderer.addClass(bodyElement, 'navOpened');
    }
  }

  getHeaderHeight(): number {
    return this.el.nativeElement.offsetHeight;
  }

  disableUpdateMode(): void {
    this.updateModeService.setUpdateMode(false);
  }
}
