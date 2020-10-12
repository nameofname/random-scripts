for i in {0..3}
do
  echo "Number: $i"
done


for element in Hydrogen Helium Lithium Beryllium
do
  echo "Element: $element"
done

# can be done in 1 line : 
for i in {1..3}; do echo "Number: $i"; done

# loop over files in the current directory :
for f in *.webp; do echo $f; done
