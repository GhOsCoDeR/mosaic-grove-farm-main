
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Plus, Edit, Trash, X, ChevronLeft,
  Search, Filter, ArrowDown, ArrowUp
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description?: string;
  variations?: { name: string; options: string[] }[];
  weight?: { options: number[]; unit: string };
};

const defaultNewProduct = {
  id: 0,
  name: '',
  price: 0,
  category: '',
  stock: 0,
  image: 'https://images.unsplash.com/photo-1563412580953-7f9e99209336?auto=format&fit=crop&w=600&q=60',
  description: '',
  variations: [{ name: 'Size', options: ['Small', 'Medium', 'Large'] }],
  weight: { options: [100, 250, 500], unit: 'g' }
};

const Inventory = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Organic Cashews",
      price: 12.99,
      category: "Nuts",
      stock: 250,
      image: "https://images.unsplash.com/photo-1563412580953-7f9e99209336?auto=format&fit=crop&w=600&q=60",
      description: "Premium organic cashews sourced ethically from our farms in Ghana.",
      variations: [{ name: "Package", options: ["Plain", "Salted", "Honey Roasted"] }],
      weight: { options: [100, 250, 500], unit: "g" }
    },
    {
      id: 2,
      name: "Tiger Nut Flour",
      price: 9.99,
      category: "Flour",
      stock: 175,
      image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&w=600&q=60",
      description: "Fine tiger nut flour, perfect for gluten-free baking.",
      weight: { options: [250, 500, 1000], unit: "g" }
    },
    {
      id: 3,
      name: "Tiger Nut Milk",
      price: 6.99,
      category: "Beverages",
      stock: 120,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=60",
      description: "Creamy plant-based milk alternative made from tiger nuts.",
      variations: [{ name: "Flavor", options: ["Original", "Vanilla", "Chocolate"] }],
      weight: { options: [500, 1000], unit: "ml" }
    },
    {
      id: 4,
      name: "Tiger Nut Dessert",
      price: 8.99,
      category: "Dessert",
      stock: 85,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=60",
      description: "Delicious frozen dessert made with tiger nut milk.",
      variations: [{ name: "Flavor", options: ["Vanilla", "Chocolate", "Strawberry"] }],
      weight: { options: [150, 300], unit: "g" }
    }
  ]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [newProduct, setNewProduct] = useState<Product>({...defaultNewProduct});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [variationName, setVariationName] = useState('');
  const [variationOptions, setVariationOptions] = useState('');
  const [weightOption, setWeightOption] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      (categoryFilter === 'all' || product.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortColumn === 'name' || sortColumn === 'category') {
        return sortDirection === 'asc' 
          ? a[sortColumn].localeCompare(b[sortColumn]) 
          : b[sortColumn].localeCompare(a[sortColumn]);
      } else {
        return sortDirection === 'asc' 
          ? Number(a[sortColumn]) - Number(b[sortColumn]) 
          : Number(b[sortColumn]) - Number(a[sortColumn]);
      }
    });

  const handleSort = (column: keyof Product) => {
    setSortDirection(prevDirection => 
      sortColumn === column && prevDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortColumn(column);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from inventory.",
    });
  };

  const handleAddProduct = () => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const productToAdd = {...newProduct, id: newId};
    
    setProducts([...products, productToAdd]);
    setNewProduct({...defaultNewProduct});
    setIsAddProductOpen(false);
    
    toast({
      title: "Product added",
      description: `${productToAdd.name} has been added to inventory.`,
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    
    setProducts(products.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    ));
    
    setEditingProduct(null);
    setIsEditProductOpen(false);
    
    toast({
      title: "Product updated",
      description: `${editingProduct.name} has been updated.`,
    });
  };

  const handleAddVariation = () => {
    if (!variationName || !variationOptions) return;
    
    const options = variationOptions.split(',').map(option => option.trim());
    
    if (isEditProductOpen && editingProduct) {
      const updatedVariations = [
        ...(editingProduct.variations || []),
        { name: variationName, options }
      ];
      setEditingProduct({...editingProduct, variations: updatedVariations});
    } else {
      const updatedVariations = [
        ...(newProduct.variations || []),
        { name: variationName, options }
      ];
      setNewProduct({...newProduct, variations: updatedVariations});
    }
    
    setVariationName('');
    setVariationOptions('');
  };

  const handleAddWeightOption = () => {
    if (!weightOption) return;
    
    const weight = parseFloat(weightOption);
    if (isNaN(weight) || weight <= 0) return;
    
    if (isEditProductOpen && editingProduct) {
      const updatedOptions = [
        ...(editingProduct.weight?.options || []),
        weight
      ].sort((a, b) => a - b);
      
      setEditingProduct({
        ...editingProduct, 
        weight: { 
          options: updatedOptions, 
          unit: editingProduct.weight?.unit || 'g'
        }
      });
    } else {
      const updatedOptions = [
        ...(newProduct.weight?.options || []),
        weight
      ].sort((a, b) => a - b);
      
      setNewProduct({
        ...newProduct, 
        weight: { 
          options: updatedOptions, 
          unit: newProduct.weight?.unit || 'g'
        }
      });
    }
    
    setWeightOption('');
  };

  const handleRemoveVariation = (index: number) => {
    if (isEditProductOpen && editingProduct) {
      const updatedVariations = [...(editingProduct.variations || [])];
      updatedVariations.splice(index, 1);
      setEditingProduct({...editingProduct, variations: updatedVariations});
    } else {
      const updatedVariations = [...(newProduct.variations || [])];
      updatedVariations.splice(index, 1);
      setNewProduct({...newProduct, variations: updatedVariations});
    }
  };

  const handleRemoveWeightOption = (weight: number) => {
    if (isEditProductOpen && editingProduct) {
      const updatedOptions = (editingProduct.weight?.options || []).filter(w => w !== weight);
      setEditingProduct({
        ...editingProduct, 
        weight: { 
          options: updatedOptions, 
          unit: editingProduct.weight?.unit || 'g'
        }
      });
    } else {
      const updatedOptions = (newProduct.weight?.options || []).filter(w => w !== weight);
      setNewProduct({
        ...newProduct, 
        weight: { 
          options: updatedOptions, 
          unit: newProduct.weight?.unit || 'g'
        }
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // In a real application, you would upload this file to a server
      // For now, we'll just create a local URL to preview the image
      const imageUrl = URL.createObjectURL(file);
      
      if (isEditProductOpen && editingProduct) {
        setEditingProduct({...editingProduct, image: imageUrl});
      } else {
        setNewProduct({...newProduct, image: imageUrl});
      }
    }
  };

  const renderProductForm = (product: Product, isEdit: boolean) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${isEdit ? 'edit' : 'add'}-name`}>Product Name</Label>
              <Input 
                id={`${isEdit ? 'edit' : 'add'}-name`}
                value={product.name} 
                onChange={(e) => {
                  if (isEdit) {
                    setEditingProduct({...editingProduct!, name: e.target.value});
                  } else {
                    setNewProduct({...newProduct, name: e.target.value});
                  }
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`${isEdit ? 'edit' : 'add'}-category`}>Category</Label>
              <Input 
                id={`${isEdit ? 'edit' : 'add'}-category`}
                value={product.category} 
                onChange={(e) => {
                  if (isEdit) {
                    setEditingProduct({...editingProduct!, category: e.target.value});
                  } else {
                    setNewProduct({...newProduct, category: e.target.value});
                  }
                }}
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor={`${isEdit ? 'edit' : 'add'}-price`}>Price ($)</Label>
              <Input 
                id={`${isEdit ? 'edit' : 'add'}-price`}
                type="number" 
                step="0.01"
                value={product.price} 
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (isEdit) {
                    setEditingProduct({...editingProduct!, price: value});
                  } else {
                    setNewProduct({...newProduct, price: value});
                  }
                }}
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor={`${isEdit ? 'edit' : 'add'}-stock`}>Stock</Label>
              <Input 
                id={`${isEdit ? 'edit' : 'add'}-stock`}
                type="number" 
                value={product.stock} 
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (isEdit) {
                    setEditingProduct({...editingProduct!, stock: value});
                  } else {
                    setNewProduct({...newProduct, stock: value});
                  }
                }}
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor={`${isEdit ? 'edit' : 'add'}-description`}>Description</Label>
              <Textarea 
                id={`${isEdit ? 'edit' : 'add'}-description`}
                value={product.description || ''} 
                onChange={(e) => {
                  if (isEdit) {
                    setEditingProduct({...editingProduct!, description: e.target.value});
                  } else {
                    setNewProduct({...newProduct, description: e.target.value});
                  }
                }}
                className="mt-1" 
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${isEdit ? 'edit' : 'add'}-image`}>Product Image</Label>
              <div className="mt-1 flex items-center">
                <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
                  <img 
                    src={product.image} 
                    alt="Product preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input 
                  id={`${isEdit ? 'edit' : 'add'}-image`}
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            
            <div>
              <Label>Weight Options</Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {product.weight?.options.map((weight) => (
                  <div 
                    key={weight} 
                    className="flex items-center bg-mosaic-earth-light px-2 py-1 rounded-md"
                  >
                    <span>{weight} {product.weight?.unit}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 ml-2"
                      onClick={() => handleRemoveWeightOption(weight)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center mt-2 gap-2">
                <Input
                  type="number"
                  value={weightOption}
                  onChange={(e) => setWeightOption(e.target.value)}
                  placeholder="Add weight option"
                  className="flex-1"
                />
                <Select 
                  value={isEdit ? editingProduct?.weight?.unit || 'g' : newProduct.weight?.unit || 'g'}
                  onValueChange={(value) => {
                    if (isEdit && editingProduct) {
                      setEditingProduct({
                        ...editingProduct,
                        weight: {
                          options: editingProduct.weight?.options || [],
                          unit: value
                        }
                      });
                    } else {
                      setNewProduct({
                        ...newProduct,
                        weight: {
                          options: newProduct.weight?.options || [],
                          unit: value
                        }
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="l">l</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddWeightOption}
                >
                  Add
                </Button>
              </div>
            </div>
            
            <div>
              <Label>Variations</Label>
              <div className="mt-1">
                {product.variations?.map((variation, index) => (
                  <div 
                    key={index}
                    className="mb-2 p-2 border border-mosaic-earth rounded-md"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{variation.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleRemoveVariation(index)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {variation.options.join(', ')}
                    </div>
                  </div>
                ))}
                <div className="space-y-2 mt-4">
                  <div className="flex gap-2">
                    <Input
                      value={variationName}
                      onChange={(e) => setVariationName(e.target.value)}
                      placeholder="Variation name (e.g. Color, Size)"
                      className="flex-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={variationOptions}
                      onChange={(e) => setVariationOptions(e.target.value)}
                      placeholder="Options (comma separated)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddVariation}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark animate-fade-in">
            Inventory Management
          </h1>
          
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors animate-fade-in">
                <Plus size={20} className="mr-2" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                {renderProductForm(newProduct, false)}
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-mosaic-green hover:bg-mosaic-green-dark"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Update the details for this product.
                </DialogDescription>
              </DialogHeader>
              {editingProduct && (
                <div className="mt-4">
                  {renderProductForm(editingProduct, true)}
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-mosaic-green hover:bg-mosaic-green-dark"
                      onClick={handleEditProduct}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in mb-8" style={{ animationDelay: "0.1s" }}>
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-32 md:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-mosaic-earth-light">
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('image')}
                    >
                      Image
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('name')}
                    >
                      Name
                      {sortColumn === 'name' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('category')}
                    >
                      Category
                      {sortColumn === 'category' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('price')}
                    >
                      Price
                      {sortColumn === 'price' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('stock')}
                    >
                      Stock
                      {sortColumn === 'stock' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mosaic-earth-light">
                {filteredProducts.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-gray-50 transition-colors"
                    style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.stock > 100 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 50 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors"
                          onClick={() => {
                            setEditingProduct({...product});
                            setIsEditProductOpen(true);
                          }}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No products found. Try adjusting your search or filter.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Inventory;
