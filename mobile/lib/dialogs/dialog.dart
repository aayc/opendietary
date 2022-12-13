import 'package:flutter/material.dart';
import 'package:opendietary/textstyles.dart';

void dialog(BuildContext context, String title, String text, {Function? onClose}) {
  showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: SingleChildScrollView(child: Text(text, style: H5)),
          actions: [
            TextButton(
              child: const Text("OK"),
              onPressed: () {
                Navigator.of(context).pop();
                if (onClose != null) {
                  onClose();
                }
              },
            ),
          ],
        );
      });
}

void confirm(BuildContext context, String title, String text,
    {Function? onOK, Function? onCancel}) {
  showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: Text(text, style: H5),
          actions: [
            TextButton(
              child: const Text("OK"),
              onPressed: () {
                Navigator.of(context).pop();
                if (onOK != null) {
                  onOK();
                }
              },
            ),
            TextButton(
              child: const Text("CANCEL"),
              onPressed: () {
                Navigator.of(context).pop();
                if (onCancel != null) {
                  onCancel();
                }
              },
            ),
          ],
        );
      });
}

void dialogOptions(
    BuildContext context, String title, List<String> options, List<Function> callbacks,
    {bool popAfter: true}) {
  showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          contentPadding: const EdgeInsets.only(left: 10, bottom: 20, top: 15),
          title: title != "" ? Text(title, style: BOLD(H5.copyWith(color: Colors.black))) : null,
          content: Container(
            width: 100,
            child: ListView.separated(
                shrinkWrap: true,
                itemCount: options.length,
                separatorBuilder: (context, text) => const SizedBox(height: 15),
                itemBuilder: (context, index) => InkWell(
                      onTap: () {
                        callbacks[index]();
                        if (popAfter) {
                          Navigator.pop(context);
                        }
                      },
                      child: Container(
                          height: 30,
                          child: ListTile(
                              title:
                                  Text(options[index], style: H5.copyWith(color: Colors.black)))),
                    )),
          ),
          actions: [],
        );
      });
}
