import { skip } from "rxjs";
import { ToastService } from "./toast.service";

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = new ToastService();
  });

  it('should be initialized with an empty array', () => {
    expect(service.toasts).toEqual([]);
  });

  it('should add a message to the toasts array', () => {
    service.show('Test Toast');
    const found = service.toasts.find(t => t === 'Test Toast');
    expect(found).toBeTruthy();
    service.toasts$.subscribe(toasts => {
      expect(toasts).toEqual(['Test Toast']);
    });
  });

  it('should remove a message from the toast array', () => {
    service.show('Test Toast');
    service.show('Test Toast 2');
    service.remove('Test Toast');
    const found = service.toasts.find(t => t === 'Test Toast');
    expect(found).toBeUndefined();
    const found2 = service.toasts.find(t => t === 'Test Toast 2');
    expect(found2).toBeDefined();
    service.toasts$.pipe(skip(2)).subscribe(toasts => {
      expect(toasts).toEqual(['Test Toast']);
    });
  });

  it('should clear the toasts array', () => {
    service.show('Test Toast');
    service.clear();
    expect(service.toasts).toEqual([]);
    service.toasts$.pipe(skip(1)).subscribe(toasts => {
      expect(toasts).toEqual([]);
    });
  });
});
