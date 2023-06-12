import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root',
})
export class NotiService {
  constructor(private message: NzMessageService) {}
  success(message?: string, duration?: number) {
    this.message.success(message || 'Cập nhật thành công', {
      nzDuration: duration || 3000,
    });
  }
  warning(message?: string, duration?: number) {
    this.message.warning(message || 'Có lỗi xảy ra', {
      nzDuration: duration || 3000,
    });
  }
}
