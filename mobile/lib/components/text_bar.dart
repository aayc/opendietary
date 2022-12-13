import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../textstyles.dart';

class TextBar extends StatelessWidget {
  final TextEditingController? controller;
  final Function(String)? onChanged;
  final String hintText;
  final Color? backgroundColor;
  final TextStyle? textStyle;
  final TextStyle? hintTextStyle;
  final Widget prefixIcon;
  final Widget suffixIcon;
  final Function()? onTapPrefixIcon;
  final Function(bool)? onFocus;
  final Function()? onSubmit;
  final TextInputAction? inputAction;
  final double paddingRight;
  final TextAlign textAlign;
  final bool editable;
  final bool noBorder;
  final bool obscureText;
  final int? maxLines;
  final int? minLines;
  final int? maxLength;
  final bool addUnderline;
  final FocusNode? focusNode;

  TextBar(
      {this.controller,
      this.hintText = '',
      this.onChanged,
      this.editable = true,
      this.noBorder = true,
      this.minLines = 1,
      this.maxLines = 1,
      this.maxLength,
      this.textAlign = TextAlign.left,
      this.textStyle,
      this.hintTextStyle,
      this.inputAction,
      this.onTapPrefixIcon,
      this.backgroundColor,
      this.paddingRight = 10,
      this.addUnderline = false,
      this.obscureText = false,
      this.onFocus,
      this.focusNode,
      this.onSubmit,
      this.prefixIcon = const SizedBox(width: 0),
      this.suffixIcon = const SizedBox(width: 0)}) {
    if (focusNode != null && onFocus != null) {
      focusNode!.addListener(() {
        onFocus!(focusNode!.hasPrimaryFocus);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
            color: backgroundColor ?? Colors.white,
            border: noBorder ? null : Border.all(color: Colors.grey[300]!),
            borderRadius: BorderRadius.circular(10)),
        padding: const EdgeInsets.only(top: 5),
        child: Row(
          children: [
            const SizedBox(width: 10),
            Align(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: const EdgeInsets.only(top: 4.0),
                child: prefixIcon,
              ),
            ),
            const SizedBox(width: 5),
            Expanded(
              child: TextField(
                onChanged: onChanged,
                focusNode: focusNode,
                autofocus: false,
                obscureText: obscureText,
                textAlignVertical: TextAlignVertical.center,
                style: textStyle ?? H5,
                textInputAction: inputAction ?? TextInputAction.unspecified,
                onSubmitted: (_) {
                  if (inputAction != null) {
                    focusNode?.unfocus();
                  }
                  if (onSubmit != null) {
                    onSubmit!();
                  }
                },
                maxLines: maxLines,
                minLines: minLines,
                maxLength: maxLength,
                textAlign: textAlign,
                maxLengthEnforcement:
                    maxLength != null ? MaxLengthEnforcement.enforced : MaxLengthEnforcement.none,
                controller: controller,
                readOnly: !editable,
                cursorColor: Colors.grey,
                decoration: InputDecoration(
                  border: const OutlineInputBorder(borderSide: BorderSide.none),
                  enabledBorder: addUnderline
                      ? const UnderlineInputBorder(
                          borderSide: BorderSide(color: DARK_BEIGE_BG),
                        )
                      : null,
                  counterText: null,
                  counter: const SizedBox(height: 0, width: 0),
                  contentPadding: const EdgeInsets.only(top: 5),
                  hintText: hintText,
                  hintStyle: hintTextStyle ?? H5.copyWith(color: Colors.grey[600]),
                ),
              ),
            ),
            suffixIcon,
            SizedBox(width: paddingRight),
          ],
        ));
  }
}
