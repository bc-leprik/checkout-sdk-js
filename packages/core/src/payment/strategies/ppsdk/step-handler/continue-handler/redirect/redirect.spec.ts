import { createFormPoster } from '@bigcommerce/form-poster';

import { PaymentMethodCancelledError } from '../../../../../errors';

import { handleRedirect, isRedirect, Redirect } from './redirect';

describe('handleRedirect', () => {
    const formPoster = createFormPoster();
    let initialUrl: string;

    beforeAll(() => {
        initialUrl = window.location.href;
    });

    afterEach(() => {
        window.history.replaceState(null, '', initialUrl);
    });

    describe('when there is not an already pending redirect', () => {
        describe('when not passed formFields', () => {
            it('calls location assign with the url, never resolves or rejects', () => {
                const resolveMock = jest.fn();
                const rejectMock = jest.fn();
                const assignSpy = jest.spyOn(window.location, 'assign').mockImplementation(jest.fn);

                const redirectContinueResponse = {
                    url: 'http://some-url.com',
                };

                handleRedirect(redirectContinueResponse, formPoster).then(resolveMock).catch(rejectMock);

                expect(assignSpy).toHaveBeenCalledWith('http://some-url.com');
                expect(resolveMock).not.toHaveBeenCalled();
                expect(rejectMock).not.toHaveBeenCalled();
            });
        });

        describe('with passed formFields', () => {
            it('posts a form to the url along with fields, never resolves or rejects', () => {
                const postFormSpy = jest.spyOn(formPoster, 'postForm').mockImplementation(jest.fn);
                const resolveMock = jest.fn();
                const rejectMock = jest.fn();

                const formFields = {
                    someField: 'some-value',
                    anotherField: 'another-value',
                };

                const redirectContinueResponse = {
                    url: 'http://some-post-url.com',
                    formFields,
                };

                handleRedirect(redirectContinueResponse, formPoster).then(resolveMock).catch(rejectMock);

                expect(postFormSpy).toHaveBeenCalledWith('http://some-post-url.com', formFields);
                expect(resolveMock).not.toHaveBeenCalled();
                expect(rejectMock).not.toHaveBeenCalled();
            });
        });
    });

    describe('when there is an already pending redirect', () => {
        it('rejects with a PaymentMethodCancelledError', async () => {
            const redirectContinueResponse = {
                url: 'http://some-url.com',
            };

            handleRedirect(redirectContinueResponse, formPoster);

            await expect(handleRedirect(redirectContinueResponse, formPoster)).rejects.toBeInstanceOf(PaymentMethodCancelledError);
        });
    });
});

describe('isRedirect', () => {
    it('returns true when passed valid redirect responses', () => {
        const redirectByGetResponse: Redirect = {
            type: 'continue',
            code: 'redirect',
            parameters: {
                url: 'http://some-url.com',
            },
        };

        const redirectByPostResponse: Redirect = {
            type: 'continue',
            code: 'redirect',
            parameters: {
                url: 'http://some-url.com',
                formFields: {
                    someField: 'some-value',
                    anotherField: 'another-value',
                },
            },
        };

        expect(isRedirect(redirectByGetResponse)).toBe(true);
        expect(isRedirect(redirectByPostResponse)).toBe(true);
    });

    it('returns false when passed an invalid redirect response', () => {
        const invalidResponse = {
            type: 'anything',
        };

        expect(isRedirect(invalidResponse)).toBe(false);
    });
});
