import { Injectable } from '@angular/core';
import { Experience, isExperience } from './@interfaces/experience.interface';
import { isLanguage, Language } from './@interfaces/language.interface';
import { TranslateService } from '@ngx-translate/core';
import { isProject, Project } from './@interfaces/project.interface';

@Injectable()
export class AppService {
  constructor(private readonly translateService: TranslateService) {}
  public getLanguagesData(): Promise<Language[]> {
    return fetch('assets/data/languages.json')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('Languages data not found', response);
          return [];
        }
      })
      .then((languages: Language[]) => {
        // Check data format
        if (languages.every((el) => isLanguage(el))) {
          return languages;
        } else {
          console.error('Wrong data format');
          return [];
        }
      });
  }

  public getFormationsData(): Promise<Experience[]> {
    return fetch('assets/data/formations.json')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('Formations data not found', response);
          return [];
        }
      })
      .then((formations: Experience[]) => {
        // Check data format
        if (formations.every((el) => isExperience(el))) {
          return formations;
        } else {
          console.error('Wrong data format');
          return [];
        }
      });
  }

  public getJobsData(): Promise<Experience[]> {
    return fetch('assets/data/jobs.json')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('jobs data not found', response);
          return [];
        }
      })
      .then((jobs: Experience[]) => {
        // Check data format
        if (jobs.every((el) => isExperience(el))) {
          return jobs;
        } else {
          console.error('Wrong data format');
          return [];
        }
      });
  }

  public getProjectsData(): Promise<Project[]> {
    return fetch('assets/data/projects.json')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('Projects data not found', response);
          return [];
        }
      })
      .then((projects: Project[]) => {
        // Check data format
        if (projects.every((el) => isProject(el))) {
          return projects;
        } else {
          console.error('Wrong data format');
          return [];
        }
      });
  }

  public getStuffData(): Promise<Project[]> {
    return fetch('assets/data/stuff.json')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('Projects data not found', response);
          return [];
        }
      })
      .then((projects: Project[]) => {
        // Check data format
        if (projects.every((el) => isProject(el))) {
          return projects;
        } else {
          console.error('Wrong data format');
          return [];
        }
      });
  }

  private async openAllCards(documentElement: HTMLElement) {
    // Open all cards
    const showMoreButtons =
      documentElement.getElementsByClassName('show-more-button');
    if (!showMoreButtons || showMoreButtons.length === 0) {
      return;
    }
    for (const divElement of Array.from(showMoreButtons)) {
      const button = divElement.querySelector('button');
      if (!button) {
        continue;
      }
      const icon = button.querySelector('mat-icon');
      if (icon && icon.textContent === 'keyboard_arrow_down') {
        button.click();
      }

      // wait for the document to be updated
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  private removeSettings(clonedDocument: Document) {
    // Remove settings button
    clonedDocument.querySelector('app-settings');
    const appSettingsElementMobileHeader =
      clonedDocument.querySelector('app-settings');
    if (appSettingsElementMobileHeader) {
      appSettingsElementMobileHeader.remove();
    }
    const appSettingsElementSmallColumn =
      clonedDocument.querySelector('app-settings');
    if (appSettingsElementSmallColumn) {
      appSettingsElementSmallColumn.remove();
    }

    // Remove settings menu
    const settingsMenu = clonedDocument.getElementsByClassName(
      'cdk-overlay-container'
    );
    if (settingsMenu && settingsMenu.length > 0) {
      settingsMenu[0].remove();
    }
  }

  private removeShowMoreButtons(clonedDocument: Document) {
    // Remove show more buttons
    const showMoreButtons =
      clonedDocument.getElementsByClassName('show-more-button');
    if (showMoreButtons && showMoreButtons.length > 0) {
      for (const showMoreButton of Array.from(showMoreButtons)) {
        showMoreButton.remove();
      }
    }
  }

  private embedCss(clonedDocument: Document) {
    if (!clonedDocument) {
      return;
    }
    const styleSheets = Array.from(document.styleSheets);
    styleSheets.forEach((sheet) => {
      try {
        if (sheet.cssRules) {
          const style = document.createElement('style');
          style.textContent = Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
          clonedDocument.querySelector('head')?.appendChild(style);
        }
      } catch (e) {
        console.warn(`Unable to access CSS rules for ${sheet.href}`, e);
      }
    });
  }

  // Get current language used and set it in the head of the html
  private setCurrentLanguage(clonedDocument: Document) {
    const currentLanguage = this.translateService.currentLang;
    clonedDocument.documentElement.lang = currentLanguage;
  }

  public async getPdfData(): Promise<Response> {
    await this.openAllCards(document.documentElement);

    const clonedDocument = new Document();
    const myCloneBody = document.documentElement.cloneNode(true);
    clonedDocument.appendChild(myCloneBody);

    this.removeSettings(clonedDocument);
    this.removeShowMoreButtons(clonedDocument);
    this.embedCss(clonedDocument);
    this.setCurrentLanguage(clonedDocument);

    // extract the HTML of the cloned document
    let clonedDocumentString = clonedDocument.documentElement.outerHTML;

    // Replace relative paths with absolute paths
    clonedDocumentString = clonedDocumentString.replace(
      /assets\/img/g,
      'https://delphinerichard.github.io/assets/img'
    );
    clonedDocumentString = clonedDocumentString.replace(
      /favicon.ico/g,
      'https://delphinerichard.github.io/favicon.ico'
    );

    // Create a form data object and append the cloned document to it
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([clonedDocumentString], { type: 'text/html' }),
      'cv.html'
    );

    return fetch(
      'https://rivonglade.onthewifi.com/html-to-pdf/api/v1/convert',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error('Error while fetching the pdf', error);
        return Promise.reject(
          new Response(null, {
            status: 500,
            statusText: 'Internal Server Error',
          })
        );
      });
  }
}
