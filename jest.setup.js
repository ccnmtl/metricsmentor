/* global jest */
window.URL.createObjectURL = jest.fn();
import '@testing-library/jest-dom';
import 'whatwg-fetch';

window.TextEncoder = window.TextEncoder || require('util').TextEncoder;
window.TextDecoder = window.TextDecoder || require('util').TextDecoder;

HTMLCanvasElement.prototype.getContext = jest.fn(() => {
    return {
    // mock the basic methods you may need
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(() => ({ data: [] })),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        save: jest.fn(),
        fillText: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        strokeRect: jest.fn(),
        strokeText: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        transform: jest.fn(),
        rect: jest.fn(),
        clip: jest.fn(),
    };
});
