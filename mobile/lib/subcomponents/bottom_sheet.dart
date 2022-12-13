import 'package:flutter/material.dart';
import 'package:sliding_sheet/sliding_sheet.dart';

Future<dynamic> displayCustomBottomSheet(
    Function(BuildContext, StateSetter) createWidget, BuildContext bc,
    {double maxHeight = 600.0,
    double minHeight = 400.0,
    double hpad = 20.0,
    Color backgroundColor = Colors.white}) {
  return showModalBottomSheet(
      backgroundColor: backgroundColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(10.0), topRight: const Radius.circular(10.0)),
      ),
      context: bc,
      isScrollControlled: true,
      builder: (cxt) => StatefulBuilder(builder: (BuildContext context, StateSetter setModalState) {
            return Padding(
                padding: EdgeInsets.only(
                    left: hpad,
                    right: hpad,
                    top: 10.0,
                    bottom: MediaQuery.of(context).viewInsets.bottom),
                child: ConstrainedBox(
                    constraints: BoxConstraints(maxHeight: maxHeight, minHeight: minHeight),
                    child: ListView(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        children: [createWidget(context, setModalState)])));
          }));
}

Future<dynamic> displayScrollableBottomSheet(
    {required Function(BuildContext) builder,
    required BuildContext bc,
    Color? color,
    double? maxHeight,
    EdgeInsets? padding}) async {
  final result =
      await showSlidingBottomSheet(bc, resizeToAvoidBottomInset: false, builder: (context) {
    return SlidingSheetDialog(
      elevation: 8,
      color: color ?? Colors.white,
      cornerRadius: 16,
      duration: Duration(milliseconds: 400),
      snapSpec: const SnapSpec(
        snap: true,
        snappings: [1.0],
        positioning: SnapPositioning.relativeToAvailableSpace,
      ),
      builder: (context, state) {
        return Container(
            height: maxHeight ?? 700,
            color: color?.withOpacity(0.6) ?? Colors.white,
            padding: padding ?? EdgeInsets.zero,
            child: Material(color: color ?? Colors.white, child: builder(context)));
      },
    );
  });

  return result;
}
