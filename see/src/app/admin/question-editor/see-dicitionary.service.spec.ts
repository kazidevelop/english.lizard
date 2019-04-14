import SeeDefinition from './see-definition.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { SeeDictionaryService } from './see-dictionary.service';
import { environment } from '../../../environments/environment';


describe('See-Dictionary testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dictionaryService: SeeDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    dictionaryService = new SeeDictionaryService(httpClient);

  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('word with pronouniciation and meaning only return correctly - with example', () => {

    const expectedDefinition: SeeDefinition = {
      word: 'concern',
      pronunciation: 'https://s3.amazonaws.com/audio.oxforddictionaries.com/en/mp3/xconcern_us_1.mp3',
      meaning: "Relate to; be about.", type: 'verb', example: "the story concerns a friend of mine"
    };

    const testData = [
      {
        word: expectedDefinition.word,
        "phonetic": "/kənˈsərn/",
        "pronunciation": expectedDefinition.pronunciation,
        "meaning": {
          "verb": [
            {
              "definition": expectedDefinition.meaning,
              "example": expectedDefinition.example,
              "synonyms": [
                "be about",
                "deal with",
                "cover",
                "treat",
                "have to do with"
              ]
            },
            {
              "definition": "Worry (someone); make anxious.",
              "example": "the roof of the barn concerns me because eventually it will fall in",
              "synonyms": [
                "worry",
                "disturb",
                "trouble",
                "bother",
                "perturb",
                "unsettle",
                "make anxious",
                "distress",
                "upset",
                "agitate",
                "cause disquiet to",
                "disquiet"
              ]
            }
          ],
          "noun": [
            {
              "definition": "Anxiety; worry.",
              "example": "such unsatisfactory work gives cause for concern",
              "synonyms": [
                "anxiety",
                "worry",
                "disquiet",
                "disquietude",
                "apprehension",
                "apprehensiveness",
                "unease",
                "uneasiness",
                "perturbation",
                "consternation",
                "distress",
                "agitation"
              ]
            },
            {
              "definition": "A matter of interest or importance to someone.",
              "example": "oil reserves are the concern of the Energy Department",
              "synonyms": [
                "responsibility",
                "business",
                "affair",
                "charge",
                "duty",
                "job",
                "task",
                "occupation"
              ]
            },
            {
              "definition": "A business; a firm.",
              "example": "a small, debt-ridden concern",
              "synonyms": [
                "company",
                "business",
                "firm",
                "enterprise",
                "venture",
                "organization",
                "operation",
                "undertaking",
                "industry",
                "corporation",
                "establishment",
                "house",
                "shop",
                "office",
                "bureau",
                "agency",
                "franchise",
                "practice",
                "partnership",
                "consortium",
                "cooperative",
                "conglomerate",
                "group",
                "combine",
                "syndicate"
              ]
            },
            {
              "definition": "A complicated or awkward object or structure."
            }
          ]
        }
      }
    ];

    runTest(testData, dictionaryService, expectedDefinition, httpTestingController);
  });


  it('word with pronouniciation and meaning only return correctly', () => {

    const expectedDefinition: SeeDefinition = {
      word: 'anagram',
      pronunciation: 'https://s3.amazonaws.com/audio.oxforddictionaries.com/en/mp3/anagram_us_1.mp3',
      meaning: 'A word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.', type: 'noun', example: ''
    };

    const testData = [{
      word: expectedDefinition.word, phonetic: '/ˈænəˌɡræm/',
      pronunciation: expectedDefinition.pronunciation,
      meaning: {
        noun: [
          {
            definition: expectedDefinition.meaning,
            synonyms: [
              'riddle',
              'puzzle',
              'word game'
            ]
          }
        ]
      }
    }
    ];
    runTest(testData, dictionaryService, expectedDefinition, httpTestingController);
  });


  function runTest(testData: any, dictionaryService: SeeDictionaryService, expectedDefinition: SeeDefinition, httpTestingController: HttpTestingController) {
    const testUrlWithWord = `${environment.dictionaryUrlPreix}${testData[0].word}${environment.dictionaryUrlSuffix}`;
    dictionaryService.lookup(expectedDefinition.word).subscribe(data =>
      // When observable resolves, result should match test data
      expect(data).toEqual(expectedDefinition));
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(testUrlWithWord);
    //  // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('json');
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);
    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  }
});
