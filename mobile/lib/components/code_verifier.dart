import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:opendietary/textstyles.dart';

class VerificationCode {
  String value = "";
}

class CodeVerifier extends StatefulWidget {
  final VerificationCode code;
  final void Function() onResend;

  const CodeVerifier({super.key, required this.code, required this.onResend});

  @override
  State<CodeVerifier> createState() => _CodeVerifierState();
}

class _CodeVerifierState extends State<CodeVerifier> {
  int sent = 0;
  bool updating = false;

  void _resendCode() {
    widget.onResend();
    setState(() => sent += 1);
  }

  String getSentText() {
    if (sent == 0) {
      return "Didn't get it?  Try sending again.";
    } else {
      return "Sent again ($sent times).  Try sending again?";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: TextField(
          keyboardType: TextInputType.number,
          inputFormatters: <TextInputFormatter>[
            FilteringTextInputFormatter.allow(RegExp(r'[0-9]')),
          ],
          textAlign: TextAlign.center,
          onChanged: (text) => widget.code.value = text,
          autofocus: false,
          textAlignVertical: TextAlignVertical.top,
          style: H5.copyWith(fontSize: 48),
          cursorColor: Colors.grey,
          decoration: const InputDecoration(
            focusColor: PINK,
            hoverColor: PINK,
            fillColor: Colors.white,
            counterText: null,
            focusedBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: PINK),
            ),
            counter: SizedBox(height: 0, width: 0),
            contentPadding: EdgeInsets.only(top: 5),
          ),
        ),
      ),
      const SizedBox(height: 20),
      InkWell(onTap: _resendCode, child: Text(getSentText(), style: H6.copyWith(color: PINK))),
    ]);
  }
}
