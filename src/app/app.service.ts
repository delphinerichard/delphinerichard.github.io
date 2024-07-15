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
}
