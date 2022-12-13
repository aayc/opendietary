import 'package:flutter/material.dart';
import 'package:opendietary/subcomponents/masked_text_controller.dart';
import 'package:opendietary/textstyles.dart';

class PhoneNumber {
  String code = "1";
  String value = "";
}

class PhoneNumberInput extends StatefulWidget {
  final PhoneNumber phoneNumber;

  const PhoneNumberInput({super.key, required this.phoneNumber});

  @override
  State<PhoneNumberInput> createState() => _PhoneNumberInputState();
}

class _PhoneNumberInputState extends State<PhoneNumberInput> {
  final numberCtrl = MaskedTextController(mask: '(000) 000-0000', text: "");
  final countryCodeController = TextEditingController(text: "1");
  bool isValidCountryCode = false;
  bool isValidPhoneNumber = false;

  void onUpdatePhoneNumber(String s) {
    widget.phoneNumber.value = s;
  }

  void onUpdateCountryCode(String s) {
    widget.phoneNumber.code = s;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 60,
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(30),
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 2.0, offset: const Offset(0, 2))
            ]),
        child: Row(
          children: [
            const SizedBox(width: 30),
            const Icon(Icons.add, size: 12, color: DARK_BEIGE),
            SizedBox(
                width: 25,
                child: TextField(
                    controller: countryCodeController,
                    textAlignVertical: TextAlignVertical.center,
                    keyboardType: TextInputType.phone,
                    style: H5,
                    enabled: false,
                    decoration: const InputDecoration(
                        contentPadding: EdgeInsets.only(top: 0, left: 5),
                        border: OutlineInputBorder(borderSide: BorderSide.none),
                        fillColor: TAN,
                        counter: null,
                        counterText: ""),
                    maxLength: 5,
                    onChanged: onUpdateCountryCode)),
            const SizedBox(width: 10),
            Expanded(
              child: TextField(
                  controller: numberCtrl,
                  textAlignVertical: TextAlignVertical.center,
                  style: H5.copyWith(fontSize: 20),
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    contentPadding: EdgeInsets.only(top: 0, left: 5),
                    border: OutlineInputBorder(borderSide: BorderSide.none),
                    hintText: "(555) 555-5555",
                    fillColor: TAN,
                  ),
                  onChanged: onUpdatePhoneNumber),
            ),
          ],
        ));
  }
}
