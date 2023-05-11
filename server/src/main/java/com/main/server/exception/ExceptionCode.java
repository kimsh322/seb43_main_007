package com.main.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    PASSWORD_NOT_SAME(404, "Password not same"),
    MEMBER_NICKNAME_EXISTS(409, "Member nickname already exists"),
    MEMBER_NICKNAME_LONG(409, "Member nickname is have to under 10"),
    RRN_NOT_SAME(404, "Member RRN not same"),
    ANSWER_NOT_SAME(404, "Answer not same"),
    COFFEE_NOT_FOUND(404, "Coffee not found"),
    COFFEE_CODE_EXISTS(409, "Coffee Code exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
