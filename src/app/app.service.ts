import { Injectable } from '@angular/core';
import { Experience, isExperience } from './@interfaces/experience.interface';
import { isLanguage, Language } from './@interfaces/language.interface';

@Injectable()
export class AppService {
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

  private async openAllCards(documentElement: HTMLElement) {
    // Open all cards
    const showMoreButtons =
      documentElement.getElementsByClassName('show-more-button');
    if (!showMoreButtons || showMoreButtons.length === 0) {
      return;
    } else {
      for (const divElement of Array.from(showMoreButtons)) {
        const bu = divElement.querySelector('button');
        if (!bu) {
          console.error('No button found in div element', divElement);
          continue;
        }
        const icon = bu.querySelector('mat-icon');
        if (icon && icon.textContent === 'keyboard_arrow_down') {
          bu.click();
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  public async getPdfData(): Promise<Response> {
    await this.openAllCards(document.documentElement);

    const clonedDocument = new Document();
    const myCloneBody = document.documentElement.cloneNode(true);
    clonedDocument.appendChild(myCloneBody);

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

    // extract the HTML of the cloned document
    let clonedDocumentString = clonedDocument.documentElement.outerHTML;

    // Replace relative paths with absolute paths
    clonedDocumentString = clonedDocumentString.replace(
      /assets\/photo/g,
      'https://delphinerichard.github.io/assets/photo'
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

    return fetch('http://147.79.114.245/html-to-pdf', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log(res);
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
