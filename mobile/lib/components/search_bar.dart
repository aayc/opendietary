import 'package:flutter/material.dart';
import 'package:opendietary/textstyles.dart';

class SearchBar extends StatelessWidget {
  final void Function(String s) onSearch;
  final String hintText;
  final TextEditingController? controller;

  const SearchBar({super.key, this.controller, required this.onSearch, required this.hintText});
  @override
  Widget build(BuildContext context) {
    return Container(
        height: 40,
        decoration: BoxDecoration(color: TAN, borderRadius: BorderRadius.circular(30)),
        child: Row(
          children: [
            const SizedBox(width: 10),
            Icon(Icons.search, size: 20, color: Colors.grey[600]),
            Expanded(
              child: TextField(
                  controller: controller,
                  textAlignVertical: TextAlignVertical.center,
                  style: H5,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.only(top: 0, left: 5),
                    border: const OutlineInputBorder(borderSide: BorderSide.none),
                    hintText: hintText,
                    fillColor: TAN,
                  ),
                  onChanged: onSearch),
            ),
          ],
        ));
  }
}
