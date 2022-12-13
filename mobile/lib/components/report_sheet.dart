import 'package:flutter/material.dart';
import 'package:opendietary/dialogs/dialog.dart';
import 'package:opendietary/components/text_bar.dart';
import 'package:opendietary/services/database.dart';
import 'package:opendietary/subcomponents/bottom_sheet.dart';
import 'package:opendietary/textstyles.dart';
import 'package:opendietary/subcomponents/bottom_sheet.dart';

void showReportSheet(BuildContext context, String category, String id,
    {String? prompt, Function()? onClose}) {
  final controller = TextEditingController();
  displayCustomBottomSheet(
    (context, setState) => Column(
      children: [
        const SizedBox(height: 10),
        Container(
            height: 140,
            padding: const EdgeInsets.all(10),
            child: TextBar(
              controller: controller,
              onChanged: (s) {},
              hintText: prompt ?? 'Please describe the problem 🧐',
              backgroundColor: Colors.grey[100]!,
              maxLines: 5,
              minLines: 5,
            )),
        const SizedBox(height: 10),
        Align(
            alignment: Alignment.bottomCenter,
            child: InkWell(
                onTap: () {
                  if (controller.text != '') {
                    submitReport(category, id, controller.text);
                    Navigator.pop(context);
                    if (onClose != null) {
                      onClose();
                    } else {
                      dialog(context, "Report submitted!",
                          "Thanks for helping us take care of Tiedye 👩‍⚕️");
                    }
                  }
                },
                child: Text('SUBMIT', style: H2.copyWith(color: Colors.blue))))
      ],
    ),
    context,
    maxHeight: 250.0,
    minHeight: 250.0,
  );
}
